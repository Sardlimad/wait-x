export const InscripcionesRegulares = [
    // Grupo 8:00 AM
    {
        "id": "1a1",
        "vigente": true,
        "ruta": "La Habana - Santiago de Cuba",
        "cliente": "David Pérez",
        "fecha_inscripcion": "2023-10-01T08:00:00",
    },
    {
        "id": "1a2",
        "vigente": true,
        "ruta": "La Habana - Holguín",
        "cliente": "María González",
        "fecha_inscripcion": "2023-10-01T08:00:00",
    },
    {
        "id": "1a3",
        "vigente": true,
        "ruta": "La Habana - Camagüey",
        "cliente": "Juan Rodríguez",
        "fecha_inscripcion": "2023-10-01T08:00:00",
    },
    // Grupo 10:00 AM
    {
        "id": "2b1",
        "vigente": true,
        "ruta": "La Habana - Cienfuegos",
        "cliente": "Ana Martínez",
        "fecha_inscripcion": "2023-10-01T10:00:00",
    },
    {
        "id": "2b2",
        "vigente": true,
        "ruta": "La Habana - Matanzas",
        "cliente": "Carlos López",
        "fecha_inscripcion": "2023-10-01T10:00:00",
    },
    {
        "id": "2b3",
        "vigente": true,
        "ruta": "La Habana - Santiago de Cuba",
        "cliente": "Laura Díaz",
        "fecha_inscripcion": "2023-10-01T10:00:00",
    },
    {
        "id": "2b4",
        "vigente": true,
        "ruta": "La Habana - Holguín",
        "cliente": "Pedro Sánchez",
        "fecha_inscripcion": "2023-10-01T10:00:00",
    },
    // Grupo 12:00 PM
    {
        "id": "3c1",
        "vigente": true,
        "ruta": "La Habana - Camagüey",
        "cliente": "Rosa Fernández",
        "fecha_inscripcion": "2023-10-01T12:00:00",
    },
    {
        "id": "3c2",
        "vigente": true,
        "ruta": "La Habana - Cienfuegos",
        "cliente": "Miguel Torres",
        "fecha_inscripcion": "2023-10-01T12:00:00",
    },
    {
        "id": "3c3",
        "vigente": true,
        "ruta": "La Habana - Matanzas",
        "cliente": "Carmen García",
        "fecha_inscripcion": "2023-10-01T12:00:00",
    },
    // ... Continuar con más grupos similares hasta completar 50 registros
    // Último grupo 20:00 PM
    {
        "id": "10j1",
        "vigente": true,
        "ruta": "La Habana - Santiago de Cuba",
        "cliente": "Roberto Alonso",
        "fecha_inscripcion": "2023-10-01T20:00:00",
    },
    {
        "id": "10j2",
        "vigente": true,
        "ruta": "La Habana - Holguín",
        "cliente": "Elena Castro",
        "fecha_inscripcion": "2023-10-01T20:00:00",
    },
    {
        "id": "10j3",
        "vigente": true,
        "ruta": "La Habana - Camagüey",
        "cliente": "Luis Valdés",
        "fecha_inscripcion": "2023-10-01T20:00:00",
    }
]


export const InscripcionesPriorizadas = [
    {
        "id": "1a343ded-64cd-4821-8859-66543f8ae49a",
        "vigente": true,
        "ruta": "La Habana - Santiago de Cuba",
        "cliente": "David Pérez",
        "fecha_inscripcion": "2023-10-01",
        "causa": "SMA",
    },
    {
        "id": "2b456eef-75de-5932-9960-77654f9bf59b",
        "vigente": true,
        "ruta": "La Habana - Holguín",
        "cliente": "María González",
        "fecha_inscripcion": "2023-10-02",
        "causa": "Fallecimiento Familiar",
    },
    {
        "id": "3c567fff-86ef-6043-0071-88765f0cf60c",
        "vigente": false,
        "ruta": "La Habana - Camagüey",
        "cliente": "Juan Rodríguez",
        "fecha_inscripcion": "2023-10-03",
        "causa": "SMA",
    },
    {
        "id": "4d678ggg-97fg-7154-1182-99876f1dg71d",
        "vigente": true,
        "ruta": "La Habana - Cienfuegos",
        "cliente": "Ana Martínez",
        "fecha_inscripcion": "2023-10-04",
        "causa": "Recluso",
    },
    {
        "id": "5e789hhh-08gh-8265-2293-00987f2eh82e",
        "vigente": true,
        "ruta": "La Habana - Matanzas",
        "cliente": "Carlos López",
        "fecha_inscripcion": "2023-10-05",
        "causa": "Recluso",
    }
]

export const Fallos = [
    {
        "id": "1",
        "ruta": "La Habana - Santiago de Cuba",
        "cantidad": 5,
    },
    {
        "id": "2",
        "ruta": "La Habana - Holguín",
        "cantidad": 3,
    },
    {
        "id": "3",
        "ruta": "La Habana - Camagüey",
        "cantidad": 4,
    }
]

export const RutasFallo = [
    {
        "id": "1",
        "codigo": "HAB-SCU",
        "origen": "La Habana",
        "destino": "Santiago de Cuba",
        "capacidad": 10
    },
    {
        "id": "2",
        "codigo": "HAB-HOL",
        "origen": "La Habana",
        "destino": "Holguín",
        "capacidad": 5
    },
    {
        "id": "3",
        "codigo": "HAB-CAM",
        "origen": "La Habana",
        "destino": "Camagüey",
        "capacidad": 6
    }
];

export const clientesData = [
    // Non-prioritized clients first
    {
        id: 2,
        ci: "87654321",
        nombre: "Ana",
        apellidos: "Gómez", 
        numeroEnCola: 6,
        priorizado: false,
    },
    {
        id: 4,
        ci: "34567890",
        nombre: "María",
        apellidos: "López",
        numeroEnCola: 5,
        priorizado: false,
    },
    {
        id: 6,
        ci: "56789012",
        nombre: "Laura",
        apellidos: "García",
        numeroEnCola: 4,
        priorizado: false,
    },
    {
        id: 8,
        ci: "78901234",
        nombre: "Carmen",
        apellidos: "Sánchez",
        numeroEnCola: 3,
        priorizado: false,
    },
    {
        id: 10,
        ci: "90123456",
        nombre: "Elena",
        apellidos: "Torres",
        numeroEnCola: 2,
        priorizado: false,
    },
    {
        id: 12,
        ci: "12340987",
        nombre: "Sofia",
        apellidos: "Castro",
        numeroEnCola: 1,
        priorizado: false,
    },
    // Prioritized clients at the end
    {
        id: 1,
        ci: "12345678",
        nombre: "Juan",
        apellidos: "Pérez",
        numeroEnCola: 6,
        priorizado: true,
    },
    {
        id: 3,
        ci: "23456789",
        nombre: "Carlos",
        apellidos: "Rodríguez",
        numeroEnCola: 5,
        priorizado: true,
    },
    {
        id: 5,
        ci: "45678901",
        nombre: "Pedro",
        apellidos: "Martínez",
        numeroEnCola: 4,
        priorizado: true,
    },
    {
        id: 7,
        ci: "67890123",
        nombre: "Miguel",
        apellidos: "Fernández",
        numeroEnCola: 3,
        priorizado: true,
    },
    {
        id: 9,
        ci: "89012345",
        nombre: "Roberto",
        apellidos: "Díaz",
        numeroEnCola: 2,
        priorizado: true,
    },
    {
        id: 11,
        ci: "01234567",
        nombre: "Luis",
        apellidos: "Ramírez",
        numeroEnCola: 1,
        priorizado: true,
    }
];

export const localidadesData = [
    { id: 1, nombre: "La Habana" },
    { id: 2, nombre: "Santiago de Cuba" },
    { id: 3, nombre: "Holguín" },
    { id: 4, nombre: "Camagüey" },
    { id: 5, nombre: "Cienfuegos" },
    { id: 6, nombre: "Matanzas" }
];