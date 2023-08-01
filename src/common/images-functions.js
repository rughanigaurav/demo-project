import { s3ClipImageurl } from "../components/constant";

/**
 *  dividePN take publication number and divide it into three parts
 *  country, number, suffix
 *  Input: US20220408625A1
 *  Output: country = US, number = 20220408625, suffix = A1
 */
export const dividePN = (publicationNumber) => {
  const parts = publicationNumber.split(/(\d+)/);

  // Assigning parts to separate variables
  const country = parts[0];
  const number = parts[1];
  const suffix = publicationNumber.substr(parts[0].length + parts[1].length);
  return { country, number, suffix };
};
export const getImagePathFromPN = (publicationNumber) => {
  const { country, number, suffix } = dividePN(publicationNumber);
  const numbers = number.match(/.{1,3}/g);
  let image = `${country}/${numbers.join("/")}/${suffix}/00001.png`;
  const imagePath = `${s3ClipImageurl}${image}`;
  return imagePath;
};
