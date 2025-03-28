import Link from 'next/link';

import MainNav from '@/components/main-nav';
import Container from '@/components/ui/container';
import NavbarActions from '@/components/navbar-actions';
import getCategories from '@/actions/get-categories';
import { Category } from '@/types';

const Navbar = async () => {
  let categories: Category[] = [];
  let error = null;

  try {
    categories = await getCategories();
  } catch (err) {
    error = err;
    console.error('Failed to fetch categories:', err);
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm shadow-sm">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link
            href="/"
            className="ml-4 flex lg:ml-0 gap-x-2 group transition-all duration-300 hover:opacity-80"
          >
            <p className="font-bold text-xl bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              STORE
            </p>
          </Link>
          {!error && categories.length > 0 ? (
            <MainNav data={categories} />
          ) : (
            <div className="mx-6 flex items-center space-x-4 lg:space-x-6">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-black text-neutral-500"
              >
                Home
              </Link>
            </div>
          )}
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
