const bookFirst = {
    title: "Террор",
    description:
      "В основе сюжета лежит реальная история арктической экспедиции Франклина — плавания и гибели в 1845—1848 годах двух английских кораблей «Террор» и «Эребус», пытавшихся отыскать Северо-Западный проход.",
    author: "Дэн Симмонс",
  };
  
  const bookSecond = {
    title: "Град обреченный",
    description:
      "Основное содержание романа построено вокруг непонятного Эксперимента, который некие Наставники проводят в искусственно созданной среде",
    author: "Братья Стругацкие",
  };
  
  const bookThird = {
    title: "Убить пересмешника",
    description:
      "Трое детей боятся своего соседа — затворника Рэдли по прозвищу Страшила.",
    author: "Харпер Ли",
  };
  
  describe("Favorite book spec", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login("bropet@mail.ru", "123");
    });
  
    it("Should add new book", () => {
      cy.addBook(bookFirst);
      cy.get(".card-title").should("contain.text", bookFirst.title);
    });
  
    it("Should add new book to favorite", () => {
      cy.addFavoriteBook(bookSecond);
      cy.visit("/favorites");
      cy.get(".card-title").should("contain.text", bookSecond.title);
    });
  
    it("Should add book to favorite through 'Book list' page", () => {
      cy.addBookNoFavorite(bookFirst);
      cy.contains(bookFirst.title)
        .should("be.visible")
        .within(() => cy.get(".card-footer > .btn").click({ force: true }));
      cy.visit("/favorites");
      cy.contains(bookFirst.title).should("be.visible");
    });
  
    it("Should delete book from favorite", () => {
      cy.visit("/favorites");
      cy.contains(bookSecond.title)
        .should("be.visible")
        .within(() => cy.get(".card-footer > .btn").click({ force: true }));
      cy.contains(bookSecond.title).should("not.exist");
    });
  });