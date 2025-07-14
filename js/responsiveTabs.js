let currentTab = "#about";

function fadeIn(el, duration = 500) {
  if (!el) return;
  el.style.display = 'block';
  el.classList.add('fade-in');
  setTimeout(() => {
    el.classList.remove('fade-in');
  }, duration);
}

function fadeOut(el, duration = 250) {
  return new Promise(resolve => {
    if (!el) { resolve(); return; }
    el.classList.add('fade-out');
    setTimeout(() => {
      el.style.display = 'none';
      el.classList.remove('fade-out');
      resolve();
    }, duration);
  });
}

function switchWidth() {
  const windowWidth = window.innerWidth;
  const current = document.querySelector(currentTab);
  if (!current) return;
  if (windowWidth <= 767) {
    document.querySelectorAll('.tabContents .tabData').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tabContents .data .heading').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#tabs .data').forEach(el => el.style.display = 'block');
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
    if (section) section.style.display = 'block';
  }
}

document.addEventListener('click', function (e) {
  if (e.target.closest('.data .heading')) {
    const heading = e.target.closest('.data .heading');
    e.preventDefault();
    if (!heading.classList.contains('active')) {
      const newSection = heading.closest('.data');
      const newData = newSection.querySelector('.tabData');
      const oldSection = document.querySelector(currentTab);
      const oldData = oldSection ? oldSection.querySelector('.tabData') : null;
      currentTab = '#' + newSection.id;
      document.querySelectorAll('.tabContents .data .heading').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tabContents .tabData').forEach(el => {
        if (el !== newData && el !== oldData) el.style.display = 'none';
      });
      if (oldData && oldData !== newData) {
        fadeOut(oldData).then(() => fadeIn(newData));
      } else {
        fadeIn(newData);
      }
      if (heading) heading.classList.add('active');
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
    const newSection = document.querySelector(`section[sid="${tabID}"]`);
    const oldSection = document.querySelector(currentTab);
    document.querySelectorAll('#tabs .data').forEach(section => {
      if (section !== newSection && section !== oldSection) {
        section.style.display = 'none';
      }
    });
    if (oldSection && oldSection !== newSection) {
      fadeOut(oldSection).then(() => {
        if (newSection) fadeIn(newSection);
      });
    } else if (newSection) {
      fadeIn(newSection);
    }
    if (newSection) currentTab = '#' + newSection.id;
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
