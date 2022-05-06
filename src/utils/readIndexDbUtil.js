function handleSuccess({ target: { result } }) {
  const { id, onsuccess, onerror } = this.callback;
  const transaction = result.transaction("figures");
  const store = transaction.objectStore("figures");
  const request = store.get(id);
  request.onerror = onerror;
  request.onsuccess = function (e) {
    if (e.target.result) {
      onsuccess(e.target.result);
    }
  };
}

function handleError() {
  console.error("数据库连接失败");
  this.callback.onerror();
}

function handleUpgrade({ target: { result } }) {
  console.info("尝试创建数据库");
  if (!result.objectStoreNames.contains("figures")) {
    result.createObjectStore("figures", { keyPath: "id" });
  }
}

function readIndexDb(id, onsuccess, onerror) {
  const request = indexedDB.open("drawing-board", 3);
  request.callback = { id, onsuccess, onerror };
  request.onsuccess = handleSuccess;
  request.onerror = handleError;
  request.onupgradeneeded = handleUpgrade;
}

export default readIndexDb;