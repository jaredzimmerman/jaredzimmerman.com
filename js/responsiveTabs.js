let currentTab = "#about";

function switchWidth() {
  const windowWidth = window.innerWidth;
  const current = document.querySelector(currentTab);
  if (!current) return;
  if (windowWidth <= 767) {
    document.querySelectorAll('.tabContents .tabData').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tabContents .data .heading').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#tabs .data').forEach(el => el.style.display = '');
    const heading = current.querySelector('.heading');
    const data = current.querySelector('.tabData');
    if (heading) heading.classList.add('active');
    if (data) data.style.display = '';
  } else {
    document.querySelectorAll('#tabs .data').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tablinks li').forEach(li => {
      li.classList.remove('active');
      li.setAttribute('aria-selected', 'false');
    });
    const sid = current.getAttribute('sid');
    const link = document.getElementById(sid);
    if (link) {
      link.classList.add('active');
      link.setAttribute('aria-selected', 'true');
    }
    const section = document.querySelector(`#tabs ${currentTab}`);
    if (section) section.style.display = '';
  }
}

document.addEventListener('click', function (e) {
  if (e.target.closest('.data .heading')) {
    const heading = e.target.closest('.data .heading');
    e.preventDefault();
    if (!heading.classList.contains('active')) {
      currentTab = '#' + heading.closest('.data').id;
      const current = document.querySelector(currentTab);
      document.querySelectorAll('.tabContents .tabData').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.tabContents .data .heading').forEach(el => el.classList.remove('active'));
      const h = current.querySelector('.heading');
      const d = current.querySelector('.tabData');
      if (h) h.classList.add('active');
      if (d) d.style.display = '';
    }
  } else if (e.target.closest('.Tlinks')) {
    const target = e.target.closest('.Tlinks');
    const container = target.closest('.tablinks');
    container.querySelectorAll('li').forEach(li => {
      li.classList.remove('active');
      li.setAttribute('aria-selected', 'false');
    });
    target.classList.add('active');
    target.setAttribute('aria-selected', 'true');
    const tabID = target.id;
    document.querySelectorAll('#tabs .data').forEach(section => {
      section.style.display = 'none';
    });
    const section = document.querySelector(`section[sid="${tabID}"]`);
    if (section) {
      section.style.display = '';
      currentTab = '#' + section.id;
    }
    document.querySelectorAll('.tabContents .tabData').forEach(el => el.style.display = '');
  }
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.classList.add('js');
  switchWidth();
  document.querySelectorAll('.fade').forEach(el => el.classList.add('visible'));
  const linkLocation = window.location.hash;
  if (linkLocation !== '') {
    currentTab = linkLocation;
    const anchor = document.querySelector(`a[href="${currentTab}"]`);
    if (anchor) anchor.click();
  }
  window.addEventListener('resize', debounce(switchWidth, 100));
});
