import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { API_URL } from '../config/settings';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un token al cargar
    const token = Cookies.get('token');
    
    if (token) {
      // Si hay un token almacenado, actualizar el estado de autenticación
      setIsAuthenticated(true);
      
      // Intentar obtener la información del usuario desde el localStorage
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error al parsear datos de usuario:', e);
        }
      }
    }
    
    setIsLoading(false);
  }, []);

  // Función para refrescar el token usando el refresh token
  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No hay token de refresco disponible');
      }
      
      const response = await fetch(`${API_URL}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      });
      
      if (!response.ok) {
        throw new Error('No se pudo refrescar el token');
      }
      
      const data = await response.json();
      
      if (!data.access) {
        throw new Error('No se recibió un nuevo token de acceso');
      }
      
      // Guardar el nuevo token de acceso
      Cookies.set('token', data.access, { expires: 7 });
      
      console.log('Token refrescado exitosamente');
      return data.access;
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      // Si no se puede refrescar, forzar logout
      logout();
      throw error;
    }
  };

  // Función para hacer peticiones con manejo automático de tokens expirados
  const fetchWithToken = async (url, options = {}) => {
    try {
      // Obtener el token actual
      let token = Cookies.get('token');
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }
      
      // Configurar las opciones con el token
      const fetchOptions = {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      // Hacer la petición
      let response = await fetch(url, fetchOptions);
      
      // Si el token expiró, intentar refrescarlo
      if (response.status === 401) {
        const errorData = await response.json();
        
        if (errorData.code === 'token_not_valid') {
          console.log('Token expirado, intentando refrescar...');
          
          // Obtener un nuevo token
          token = await refreshToken();
          
          // Actualizar el token en las opciones
          fetchOptions.headers['Authorization'] = `Bearer ${token}`;
          
          // Reintentar la petición con el nuevo token
          response = await fetch(url, fetchOptions);
        }
      }
      
      return response;
    } catch (error) {
      console.error('Error en fetchWithToken:', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    console.log('Iniciando proceso de login...');
    console.log('URL de la API:', `${API_URL}/api/auth/token/`);

    try {
      const response = await fetch(`${API_URL}/api/auth/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.email,
          password: credentials.password,
        }),
      });

      console.log('Respuesta recibida:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
        throw new Error(errorData.detail || 'Error en la autenticación');
      }

      const data = await response.json();
      console.log('Datos recibidos:', {
        refresh: data.refresh ? 'presente' : 'ausente', 
        access: data.access ? 'presente' : 'ausente'
      });
      
      // Guardar el access token
      const accessToken = data.access;
      if (!accessToken) {
        throw new Error('No se pudo obtener el token de autenticación');
      }
      
      // Guardar el refresh token
      const refreshToken = data.refresh;
      if (!refreshToken) {
        throw new Error('No se pudo obtener el token de refresco');
      }
      
      // Guardar ambos tokens en cookies
      Cookies.set('token', accessToken, { expires: 7 });
      Cookies.set('refreshToken', refreshToken, { expires: 30 }); // El refresh token dura más
      
      // Guardar información básica del usuario en localStorage
      const userData = {
        username: credentials.email,
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      return data;
    } catch (error) {
      console.error('Error en el proceso de login:', error);
      throw error;
    }
  };

  const logout = () => {
    // Eliminar todas las cookies
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    
    // Limpiar los datos del usuario en localStorage
    localStorage.removeItem('userData');
    
    // Actualizar el estado
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirigir al login
    router.push('/auth/login');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    fetchWithToken
  };
} 