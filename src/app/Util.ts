const forceRegex = (data: object, regex: RegExp, field: string) =>  {
  // Ignore null-values.
  if((data as any)[field] === null) return;

  // Get value of field.
  let value:string = ((data as any)[field]).toString();

  // If value does not match regex, then set it to null.
  if(value.match(regex) === null) {
    (data as any)[field] = null;
  } else {
    // Regex matches. If the value is a number, then store it as a number.
    if(!isNaN(value as any)) {
      (data as any)[field] = parseFloat(value);
    }
  }
}

const forceRegexes = (data: object, regex: RegExp, fields: string[]) => {
  fields.forEach((field) => forceRegex(data, regex, field)); 
}

export { forceRegex, forceRegexes };