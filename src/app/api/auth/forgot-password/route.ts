import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/prisma/client';

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Do not reveal user existence.
      return NextResponse.json({
        success: true,
        message: 'If this email exists, a reset link has been generated.',
      });
    }

    await prisma.passwordResetToken.deleteMany({
      where: { email: normalizedEmail },
    });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        email: normalizedEmail,
        tokenHash,
        expiresAt,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_URL || ''}/reset-password?token=${rawToken}`;

    return NextResponse.json({
      success: true,
      message: 'Reset link generated successfully.',
      // Expose link in non-production for easy testing.
      ...(process.env.NODE_ENV !== 'production' ? { resetUrl } : {}),
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Failed to generate reset link' }, { status: 500 });
  }
}
