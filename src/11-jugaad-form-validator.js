/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  let {name, email, phone, age, pincode, state, agreeTerms} = formData;
  let count = 0;
  let reObj = {}

  //checking name
  name = name.trim();
  if(name === "" || name.length <= 1 || name.length > 50) reObj["name"] = "Name must be 2-50 characters", count++;
  
  //checking email
  if(typeof email !== 'string' || !email.includes("@") || email.indexOf('@') !== email.lastIndexOf("@") || !email.includes(".") || email.indexOf('@')>email.indexOf('.') || email.split().reduce((acc, crr) =>  crr === '@' ? acc = acc + crr : acc ,0) > 1) reObj["email"] = "Invalid email format", count++;
  
  //checking phone
  if(typeof phone !=='string' || phone.length !== 10 || !Number.isInteger(Number(phone)) || !['9','8','7','6'].includes(phone[0])) reObj["phone"] = "Invalid Indian phone number", count++;
  
  //checking age
  if(typeof age === 'string' ) age = Number(age);
  if( Number.isNaN(age) || !Number.isInteger(age) || age<16 || age >100) reObj["age"] = "Age must be an integer between 16 and 100", count++;

  // checking pincode
  if(typeof pincode !== 'string' || pincode[0]==='0' || pincode.length!==6 || Number.isNaN(Number(pincode))) reObj['pincode'] = 'Invalid Indian pincode'

  //checking state
  state = state ?? '';
  if(typeof state !=='string' || state.length === 0) reObj["state"] = "State is required", count++;

  // checking agreeTerms
  if(Boolean(agreeTerms) !== true) reObj["agreeTerms"] = "Must agree to terms", count++;

  return count !== 0 ? { isValid : false, errors: reObj} : {isValid : true, errors : reObj}
}