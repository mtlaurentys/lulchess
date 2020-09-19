function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true,
  });
}

define("webSocketsServerPort", 8000);
