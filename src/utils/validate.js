export const checkValidData = (email, password) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    //const isFullName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(fullname);

    if(!isEmailValid) return "Email is not valid";
    if(!isPasswordValid) return "Enter correct Password";
    //if(!isFullName) return "Avoid using special characters/numbers in name"

    return null;
}