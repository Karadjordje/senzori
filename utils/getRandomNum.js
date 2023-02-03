const getRandomNum = ({ from = 0, to }) => {
  return Math.floor(Math.random() * to) + from;
};

export default getRandomNum;
