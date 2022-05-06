function handleSuccess({ target: { result } }) {
  const { id, onsuccess, onerror } = this.callback;
  const transaction = result.transaction("figures", "readwrite");
  const store = transaction.objectStore("figures");
  const request = store.delete(id);
  request.onerror = onerror;
  request.onsuccess = onsuccess;
}

function handleError() {
  console.error("数据库连接失败");
  this.callback.onerror();
}

function deleteItem(id, onsuccess, onerror) {
  const request = indexedDB.open("drawing-board", 3);
  request.callback = { id, onsuccess, onerror };
  request.onsuccess = handleSuccess;
  request.onerror = handleError;
}

export default deleteItem;
