import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/choferes');
    });
    it('should have a title saying Choferes', () => {
      page.getPageOneTitleText().then(title => {
        expect(title).toEqual('Choferes');
      });
    });
  });
});
