import { NextResponse } from 'next/server';

export function middleware(request) {
  // Obtener el token de la sesión
  const token = request.cookies.get('token')?.value;

  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/auth/login', '/auth/forgot-password'];
  
  // Verificar si la ruta actual es pública
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Si no hay token y la ruta no es pública, redirigir al login
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token y la ruta es pública, redirigir al dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurar las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 