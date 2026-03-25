import { prisma } from '@/prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Palette,
  TrendingUp,
  DollarSign,
  Users,
  Plus,
  ArrowRight
} from 'lucide-react';

export default async function AdminDashboard() {
  const totalPaintings = await prisma.painting.count();
  const featuredCount = await prisma.painting.count({ where: { isFeatured: true } });
  const inStockCount = await prisma.painting.count({ where: { inStock: true } });
  const totalUsers = await prisma.user.count();

  const paintings = await prisma.painting.findMany();
  const totalValue = paintings.reduce((sum, p) => sum + p.price, 0);

  const recentPaintings = await prisma.painting.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  const stats = [
    {
      title: 'Total Paintings',
      value: totalPaintings,
      icon: Palette,
      color: 'bg-blue-500',
    },
    {
      title: 'Featured',
      value: featuredCount,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'In Stock',
      value: inStockCount,
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light text-stone-900 sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-stone-600">
            Welcome back! Here is what is happening with your gallery.
          </p>
        </div>
        <Link href="/dashboard/paintings/new">
          <Button intent="art" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Painting
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-stone-500">{stat.title}</p>
                <p className="text-2xl font-light text-stone-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-stone-800 p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-stone-300">Total Gallery Value</p>
            <p className="mt-2 text-3xl font-light sm:text-4xl">
              ${totalValue.toLocaleString()}
            </p>
          </div>
          <DollarSign className="h-12 w-12 text-stone-600" />
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-200 p-4 sm:p-6">
          <h2 className="text-lg font-medium text-stone-900">Recent Paintings</h2>
          <Link href="/dashboard/paintings">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-stone-200">
          {recentPaintings.length === 0 ? (
            <div className="p-8 text-center text-stone-500">
              No paintings yet. Add your first painting!
            </div>
          ) : (
            recentPaintings.map((painting) => (
              <div
                key={painting.id}
                className="flex flex-col gap-4 p-4 hover:bg-stone-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-stone-200 text-xs text-stone-500">
                    {painting.title.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-stone-900">
                      {painting.title}
                    </p>
                    <p className="text-xs text-stone-500">
                      {painting.artist} | ${painting.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {painting.isFeatured && (
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                      Featured
                    </span>
                  )}
                  {!painting.inStock && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                      Out of Stock
                    </span>
                  )}
                  <Link href={`/dashboard/paintings/${painting.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
