module.exports = pagination = (users, pageSize) => {
  const pages = [];
  let page = [];

  users.forEach((user) => {
    page.push(user);

    if (page.length === Number(pageSize)) {
      pages.push(page);
      page = [];
    }
  });

  if (page.length) {
    pages.push(page);
  }

  return pages;
};
