import bcrypt from "bcryptjs";

export const setPassword = async password => {
  return await bcrypt.hash(password, 10);
};

export const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

export const removeChars = (string = "") => {
  return string.replace(/[^\d]/g, "");
};

export const real = vl => {
  try {
    vl = parseFloat(vl);
    vl = vl.toFixed(2);
    vl = vl.toLocaleString("en-US", { minimumFractionDigits: 2 });
    vl = numberWithCommas(vl);

    vl = vl.toString();
    vl = vl.replace(",", "@");
    vl = vl.replace(".", "*");

    vl = vl.replace("@", ".");
    vl = vl.replace("*", ",");
  } catch (err) {
    return -1;
  }

  return vl;
};
const numberWithCommas = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const formatCpfCnpj = _cpfCnpj => {
  var cpfCnpj = removeChars(_cpfCnpj);

  if (cpfCnpj.length > 11) {
    cpfCnpj =
      cpfCnpj.substring(0, 2) +
      "." +
      cpfCnpj.substring(2, 5) +
      "." +
      cpfCnpj.substring(5, 8) +
      "/" +
      cpfCnpj.substring(8, 12) +
      "-" +
      cpfCnpj.substring(12, 14);
  } else {
    cpfCnpj =
      cpfCnpj.substring(0, 3) +
      "." +
      cpfCnpj.substring(3, 6) +
      "." +
      cpfCnpj.substring(6, 9) +
      "-" +
      cpfCnpj.substring(9, 11);
  }

  return cpfCnpj;
};

export const formatPhone = _phone => {
  var phone = removeChars(_phone);

  if (phone.length > 10) {
    phone = `(${phone.substring(0, 2)}) ${phone.substring(
      2,
      7
    )}-${phone.substring(7, 11)}`;
  } else {
    phone = `(${phone.substring(0, 2)}) ${phone.substring(
      2,
      6
    )}-${phone.substring(6, 10)}`;
  }

  return phone;
};
