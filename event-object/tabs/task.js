class SimpleTabs {
  constructor() {
    this.tabs = [...document.querySelectorAll('.tabs')];
    this.tabs.forEach(item => item.addEventListener('click', this.changeTabHandler.bind(this)));
  }

  changeTabHandler(e) {
    if (e.target.closest('.tab')) {
      let tabs = e.currentTarget.querySelectorAll('.tab');
      let tabsContent = e.currentTarget.querySelectorAll('.tab__content');
      let activeIndex = [...tabs].indexOf(e.target.closest('.tab'));

      this.hideOldTab(e);
      this.showNewTab(tabs, tabsContent, activeIndex);
    }
  }

  hideOldTab(e) {
    let activeTab = e.currentTarget.querySelector('.tab.tab_active');
    let activeTabContent = e.currentTarget.querySelector('.tab__content.tab__content_active');

    if (!activeTab || !activeTabContent) throw new Error('No active tab, or active tab content!');

    e.currentTarget.querySelector('.tab.tab_active').classList.remove('tab_active');
    e.currentTarget.querySelector('.tab__content.tab__content_active').classList.remove('tab__content_active');
  }

  showNewTab(tabs, tabsContent, activeIndex) {
    tabs[activeIndex].classList.add('tab_active');
    tabsContent[activeIndex].classList.add('tab__content_active');
  }
}

new SimpleTabs();
