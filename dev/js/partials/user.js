'use strict';

window.onload = function() {
	//open-nav
	let navTriggerList = document.querySelectorAll('.header__menu, .side-nav__logo, .side-nav__avatar, .side-nav__logout, .page__darker');
	let page = document.querySelector('.page');
	
	navTriggerList.forEach((navTrigger) => {
		navTrigger.addEventListener('click', () => {
			page.classList.toggle('open-nav');
		});
	});

	//open-cards
	let cardHeaderList = document.querySelectorAll('.card__header');
	
	accordionOpen(cardHeaderList);
	
	//open-history
	let historyHeaderList = document.querySelectorAll('.table-modal__subtitle_accordion');
	
	accordionOpen(historyHeaderList);
	
	//open table-modal
	let tableRowList = document.querySelectorAll('[data-table]');
	let modalList = document.querySelectorAll('[data-modal]');
	let modalCloseList = document.querySelectorAll('.table-modal__close, .page__modal-darker');

	tableRowList.forEach((tableRow) => {
		tableRow.addEventListener('click', (evt) => {
			
			modalList.forEach((modal) => {
				
				if (parseInt(modal.dataset.modal.match(/\d+/)) === parseInt(evt.target.parentElement.dataset.table.match(/\d+/))) {
					modal.parentElement.parentElement.classList.toggle('table-modal-open');
					page.classList.add('open-modal-darker');
				}
			});
		});
	});
	
	//close-table-modal
	modalCloseList.forEach((modalClose) => {
		modalClose.addEventListener('click', (e) => {
			
			page.classList.remove('open-modal-darker');
			
			modalList.forEach((modal) => {
				modal.parentElement.parentElement.classList.remove('table-modal-open');
			});
		});
	});
	
	
	//functions
	function accordionOpen (selector) {
		const accordionHeaderList = selector;

		accordionHeaderList.forEach((accordionHeader) => {
			accordionHeader.addEventListener('click', () => {
				accordionHeader.parentElement.parentElement.classList.toggle('accordion-open');
				if (window.getComputedStyle(accordionHeader.nextElementSibling).getPropertyValue('height') !== '0px') {
					autoHeightAnimateDelete(accordionHeader.nextElementSibling, 10, 10);
					accordionHeader.parentElement.parentElement.classList.remove('accordion-open');
				} else {
					autoHeightAnimate(accordionHeader.nextElementSibling, 5, 10);
				}
			});
		});
	}

	function autoHeightAnimate (element, time, speed) {
		let curHeight = element.offsetHeight;
		function autoHeight () {
			element.style.height = 'auto';
			return element.offsetHeight;
		}
		element.style.height = curHeight + 'px';
		function animate () {
			if (curHeight < autoHeight()) {
				curHeight += speed;
				element.style.height = curHeight + 'px';
			} else {
				clearInterval(interval);
			}
		}
		let interval = setInterval(animate, time);
	}

	function autoHeightAnimateDelete (element, time, speed) {
		let curHeight = element.offsetHeight;
		function animate () {
			if (curHeight > 0) {
				curHeight -= speed;
				element.style.height = curHeight + 'px';
			} else {
				element.style.height = '0';
				clearInterval(interval);
			}
		}
		let interval = setInterval(animate, time);
	}
}