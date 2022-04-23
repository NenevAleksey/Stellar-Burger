describe('создание заказа', () => {
   before(() => {
      cy.visit('http://localhost:3000');
   });

   it('должен открыть страницу конструктора по умолчанию', () => {
      cy.contains('Соберите бургер');
   })

   it('должен добавить ингредиенты и нажать на оформить заказ', () => {
      cy.get('[class^=BurgerConstructor_constructor_container_]').as("constructor");

      cy.get('li').contains('Флюоресцентная булка R2-D3').trigger("dragstart");
      cy.get("@constructor").trigger("drop");
      cy.get('li').contains('Кристаллы марсианских альфа-сахаридов').trigger("dragstart");
      cy.get("@constructor").trigger("drop");
      cy.get('li').contains('Плоды Фалленианского дерева').trigger("dragstart");
      cy.get("@constructor").trigger("drop");
      cy.get('button').contains('Оформить заказ').click();
   });

   it('должен войти в профиль', () => {
      cy.contains('Вход');
      cy.get('form').within(() => {
         cy.get('input:first').should('have.attr', 'name', 'e-mail').type('qwe@mail.com');
         cy.get('input:last').should('have.attr', 'name', 'password').type('1234qwer');
      })
      cy.get('button').contains('Войти').click();
      cy.get('button').contains('Оформить заказ').click();
   });

   it('должен вернутся на страницу конструктора и нажать на оформить заказ', () => {
      cy.contains('Соберите бургер');
      cy.get('button').contains('Оформить заказ').click();
   });

   it('должен загрузить и закрыть модальное окно', () => {
      cy.wait(15000)
      cy.contains('Ваш заказ начали готовить');
      cy.get("#modals button").click();
   });

   it('должен открыть страницу ленты заказа и вернулться', () => {
      cy.contains('Соберите бургер');
      cy.contains('Лента заказов').click();
      cy.wait(500);
      cy.contains('Конструктор').click();
   })

})