(function () {
  'use strict';

  var pageSize = 80;
  var state = {items:[], shown:0, section:'', accountId:''};

  var container = document.createElement('div');
  container.id = 'vlc-catalog';
  document.getElementById('section').appendChild(container);

  function element(tag, text, className) {
    var el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function message(text) {
    container.replaceChildren(element('p',text,'catalog-message'));
  }

  function showMore() {
    var grid = document.getElementById('vlc-category-grid');
    if (!grid) return;

    var end = Math.min(state.shown + pageSize, state.items.length);

    for (var i=state.shown; i<end; i++) {
      (function (category,index) {
        var button = element(
          'button',
          category.category_name || 'Unnamed category',
          'catalog-card'
        );
        button.type = 'button';
        button.addEventListener('click',function () { loadItems(category,index); });
        grid.appendChild(button);
      }(state.items[i],i));
    }

    state.shown = end;

    var old = document.getElementById('catalog-more');
    if (old) old.remove();

    if (state.shown < state.items.length) {
      var more = element('button','Show more categories','catalog-more');
      more.id = 'catalog-more';
      more.addEventListener('click',function () {
        showMore();
        more.focus();
      });
      container.appendChild(more);
    }
  }

  function render(categories) {
    container.replaceChildren();

    container.appendChild(element(
      'p',
      categories.length + ' categories available',
      'catalog-count'
    ));

    var grid = element('div',undefined,'catalog-grid');
    grid.id = 'vlc-category-grid';
    container.appendChild(grid);

    container.appendChild(
      element('p','Select a category to continue.','catalog-selected')
    );
    container.lastChild.id = 'catalog-selected';

    state.items = categories;
    state.shown = 0;
    showMore();

    var first = grid.querySelector('button');
    if (first) first.focus();
  }

  var selectedCategory = null;
  var categoriesFocus = null;
  function clearSelection() { selectedCategory=null; }
  window.VLCCatalogBack = function () {
    if(!selectedCategory)return false;
    selectedCategory=null;
    render(state.items);
    if(categoriesFocus && categoriesFocus < state.items.length){
      while(state.shown<=categoriesFocus && state.shown<state.items.length)showMore();
      var buttons=container.querySelectorAll('.catalog-card');
      if(buttons[categoriesFocus])buttons[categoriesFocus].focus();
    }
    return true;
  };
  async function loadItems(category,index) {
    selectedCategory=category;
    categoriesFocus=index;
    message('Loading '+category.category_name+'...');
    var section=state.section;
    try {
      var token=localStorage.getItem('vlc_device_token_v1');
      if(!token)throw Error('Device not paired');
      var qs=new URLSearchParams({section:section,accountId:state.accountId,categoryId:String(category.category_id)});
      var response=await fetch('/api/device/items?'+qs.toString(),{headers:{Authorization:'Bearer '+token}});
      var data=await response.json();
      if(!response.ok)throw Error(data.error||'Could not load content');
      if(state.section!==section || selectedCategory!==category)return;
      container.replaceChildren();
      var count=element('p',category.category_name+' â€” '+data.items.length+' items'+(data.limited?' (showing first 1200)':''),'catalog-count');
      container.appendChild(count);
      var back=element('button','â† Back to categories','catalog-more');
      back.addEventListener('click',function(){window.VLCCatalogBack();});
      container.appendChild(back);
      var grid=element('div',undefined,'catalog-grid');grid.className+=' catalog-items';
      container.appendChild(grid);
      data.items.forEach(function(item){
        var card=element('button',undefined,'catalog-card catalog-item');
        card.type='button';
        if(item.image && /^https?:\/\//i.test(item.image)){
          var img=document.createElement('img');img.src=item.image;img.alt='';img.loading='lazy';
          img.referrerPolicy='no-referrer';img.onerror=function(){img.remove();};card.appendChild(img);
        }
        card.appendChild(element('span',item.name));
        card.addEventListener('click',function(){
          var note=document.getElementById('vlc-item-message');
          if(!note){note=element('p',undefined,'catalog-selected');note.id='vlc-item-message';container.insertBefore(note,grid);}
          note.textContent='Selected: '+item.name+'. Playback integration is the next phase.';
        });
        grid.appendChild(card);
      });
      if(!data.items.length)container.appendChild(element('p','No content in this category.','catalog-message'));
      back.focus();
    }catch(e){message(e.message);var back=element('button','Back to categories','catalog-more');back.addEventListener('click',function(){window.VLCCatalogBack();});container.appendChild(back);back.focus();}
  }
  window.VLCLoadCategories = async function (section) {
    if (!['live','movies','series'].includes(section)) return;

    clearSelection();
    state.section = section;
    message('Loading ' + section + ' categories...');

    try {
      var token = localStorage.getItem('vlc_device_token_v1');

      if (!token) {
        throw Error('Device not paired');
      }

      var headers = {Authorization:'Bearer ' + token};

      var meResponse = await fetch('/api/device/me',{headers:headers});

      if (!meResponse.ok) {
        throw Error('Device authorization failed');
      }

      var me = await meResponse.json();

      if (!me.accounts || !me.accounts.length) {
        throw Error('No subscription assigned');
      }

      if (me.device.permissions[section] !== true) {
        throw Error('This content type is disabled');
      }

      var account = me.accounts[0];
      state.accountId = account.id;

      var query = new URLSearchParams({
        section:section,
        accountId:account.id
      });

      var response = await fetch(
        '/api/device/catalog?' + query.toString(),
        {headers:headers}
      );

      var result = await response.json();

      if (!response.ok) {
        throw Error(result.error || 'Categories request failed');
      }

      if (state.section !== section) return;

      render(result.categories || []);

    } catch (error) {
      message(error.message);
    }
  };
}());