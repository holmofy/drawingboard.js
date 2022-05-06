function handleOpenSuccess({ target: { result } }) {
  const { id, data, onsuccess, onerror } = this.callback;
  const transaction = result.transaction("figures", "readwrite");
  const store = transaction.objectStore("figures");
  const request = store.add({ id, data });
  request.onerror = onerror;
  request.onsuccess = onsuccess;
}

function handleUpgrade({ target: { result } }) {
  console.info("尝试创建数据库");
  if (!result.objectStoreNames.contains("figures")) {
    result.createObjectStore("figures", { keyPath: "id" });
  }
}

function handleOpenError() {
  console.error("数据库连接失败");
  this.callback.onerror();
}

function saveToIndexDb(id, data, onsuccess, onerror) {
  const request = indexedDB.open("drawing-board", 3);
  request.callback = { id, data, onsuccess, onerror };
  request.onsuccess = handleOpenSuccess;
  request.onerror = handleOpenError;
  request.onupgradeneeded = handleUpgrade;
}

export default saveToIndexDb;
