'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

const onNewList = (event) => {
  console.log('clicked submit');
  event.preventDefault();
  let data = getFormFields(event.target);
  api.newList(data)
    .done(ui.success)
    .fail(ui.failure);
};

const onGetAllLists = (event) => {
  event.preventDefault();
  api.allLists()
    .done(ui.getAllLists)
    .fail(ui.failure);
};

const onGetAllListContents = (data) => {
  api.getList(data)
    .done(ui.renderListContents)
    .fail(ui.failure);
};

const onAddItemToList = (event) => {
  event.preventDefault();
  let contentData = getFormFields(event.target);
  contentData.content.item_id = $(event.target).find('.item-search').attr('data-id');
  if (contentData.content.item_id) {
    api.addItemToList(contentData)
      .done(onGetAllListContents)
      .fail(ui.failure);
  } else {
    api.addNewItem(contentData)
      .done(function(data) {
        let newContentData = {
          content: {
            item_id: data.item.id,
            list_id: contentData.content.list_id,
          }
        };
        api.addItemToList(newContentData)
          .done(onGetAllListContents)
          .fail(ui.failure);
      })
      .fail(ui.failure);
  }
};

const onGetList = (event) => {
  event.preventDefault();
  let list_id = $(event.target).attr('data-id');
  console.log('list_id', list_id);
  console.log('is list_id an integer in onGetList?', Number.isInteger(Number.parseInt(list_id, 10)));
  api.getList(list_id)
    .done(ui.renderList)
    .fail(ui.failure);
};

const addHandlers = () => {
  $('.view').on('click', 'a.edit-list', onGetList);
  $('.new-list-form').on('submit', onNewList);
  $('a.get-all-lists').on('click', onGetAllLists);
  $('.item-search').autocomplete(api.autocompleteOptions);
  $('.add-item').on('submit', onAddItemToList);
};

module.exports = {
  addHandlers,
};