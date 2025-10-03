import socket from "./socket";
import productApi from "../api/product";

export const initSocketListeners = (store) => {
  socket.on("connect", () => {
    console.log("🔌 Connected to socket:", socket.id);
  });

  socket.on("productCreated", (product) => {
    console.log("🟢 Product created:", product);
    store.dispatch(productApi.util.invalidateTags([{ type: "Products", id: "LIST" }]));
  });

  socket.on("productUpdated", (product) => {
    console.log("🟡 Product updated:", product);
    store.dispatch(productApi.util.invalidateTags([
      { type: "Products", id: product._id },
      { type: "Products", id: "LIST" }
    ]));
  });

  socket.on("productDeleted", ({ id }) => {
    console.log("🔴 Product deleted:", id);
    store.dispatch(productApi.util.invalidateTags([
      { type: "Products", id },
      { type: "Products", id: "LIST" }
    ]));
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from socket");
  });
};
