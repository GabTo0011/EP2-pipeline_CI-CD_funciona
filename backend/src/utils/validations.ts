



export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) return false;
  
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  if (!name || name.trim().length === 0) return false;
  if (name.length < 2 || name.length > 50) return false;

  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

  return nameRegex.test(name);
};
