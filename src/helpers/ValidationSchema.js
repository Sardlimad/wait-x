import * as yup from "yup";

export const loginValidation = yup.object({
  user: yup
    .string("Introduzca su usuario")
    // .username("Introduzca un usuario válido")
    .required("Usuario requerido"),
  password: yup
    .string("Introduzca su contraseña")
    // .min(10, "Contraseña debe tener un mínimo de 10 caracteres")
    // .max(20, "Contraseña debe tener un máximo de 20 caracteres").matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    // .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    // .matches(/[0-9]/, "La contraseña debe contener al menos un número")
    .required("Contraseña requerida"),
});

export const registerValidation = yup.object({
  user: yup
    .string("Introduzca su usuario")
    // .username("Introduzca un usuario válido")
    .required("Usuario requerido"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Introduzca su contraseña")
    .min(10, "Contraseña debe tener un mínimo de 10 caracteres")
    .max(20, "Contraseña debe tener un máximo de 20 caracteres")
    .matches(
      /[A-Z]/,
      "La contraseña debe contener al menos una letra mayúscula"
    )
    .matches(
      /[a-z]/,
      "La contraseña debe contener al menos una letra minúscula"
    )
    .matches(/[0-9]/, "La contraseña debe contener al menos un número")
    .required("Contraseña requerida"),
});

export const clientValidation = yup.object({
  ci: yup
    .string("Introduzca el carnet de identidad")
    .matches(/^\d{11}$/, "El carnet de identidad debe contener exactamente 11 dígitos")
    .required("Carnet de identidad requerido"),

  nombre: yup
    .string("Introduzca el nombre")
    .matches(
      /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/,
      "El nombre solo puede contener letras"
    )
    .required("Nombre requerido"),

  apellidos: yup
    .string("Introduzca los apellidos")
    .matches(
      /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/,
      "Los apellidos solo pueden contener letras"
    )
    .required("Apellidos requeridos"),
});

export const regularInscriptionValidation = yup.object({
  cliente: yup.object({
    ci: yup
      .string("Introduzca el carnet de identidad")
      .matches(/^\d{11}$/, "El carnet de identidad debe contener exactamente 11 dígitos")
      .required("Carnet de identidad requerido"),

    nombre: yup
      .string("Introduzca el nombre")
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/,
        "El nombre solo puede contener letras"
      )
      .required("Nombre requerido"),

    apellidos: yup
      .string("Introduzca los apellidos")
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/,
        "Los apellidos solo pueden contener letras"
      )
      .required("Apellidos requeridos"),
  }),
  rutasSeleccionadas: yup
    .array()
    .min(1, "Debe seleccionar al menos una ruta")
    .max(3, "No puede seleccionar más de 3 rutas")
});