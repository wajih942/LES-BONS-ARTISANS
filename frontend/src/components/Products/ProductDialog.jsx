import React , { useEffect }from "react";
import { Typography } from "@mui/material";
import ConfirmDialog from "../ui/ConfirmDialog";
import ActionButtons from "../ui/ActionButtons";
import ProductForm from "./ProductForm";
import { useSelector } from "react-redux";

export default function ProductDialog({
  open,
  setOpen,
  action,
  product,
  updatedProduct,
  onClose,
  onChange,
  onDelete,
  setAction,
}) {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const userId = useSelector((state) => state.authSlice.userId);
    useEffect(() => {
    if (open) {
      setAction(null);
    }
  }, [open, setAction]);
  let content;
  let actions;

  if (!action) {
    content = (
      <>
        <img
          src="https://i5.walmartimages.com/seo/Apple-iPhone-X-64GB-Unlocked-GSM-Phone-w-Dual-12MP-Camera-Space-Gray-B-Grade-Used_15c2b968-bb85-41a4-9292-b017f78fe797.a66ebbf32b6d53b6d6eb14c47434ac04.jpeg"
          alt={product.name}
          style={{ height: "200px", borderRadius: 8 }}
        />
        <Typography variant="body1">Price: ${product.price.toFixed(2)}</Typography>
        <Typography variant="body1">Rating: {product.rating}</Typography>
        <Typography variant="body1">Warranty: {product.warranty_years} year(s)</Typography>
        <Typography variant="body1">Status: {product.available ? "Available" : "Out of Stock"}</Typography>
      </>
    );

    actions = isAuth && userId == product.user
      ? [
          { label: "Delete", color: "error", onClick: () => setAction("delete") },
          { label: "Update", color: "primary", onClick: () => setAction("update") },
          { label: "Close", color: "secondary", onClick: onClose },
        ]
      : [{ label: "Close", color: "secondary", onClick: onClose }];
  }

  if (action === "delete") {
    content = (
      <Typography variant="h6" color="error">
        Are you sure you want to delete <b>{product.name}</b>? You can't undo this.
      </Typography>
    );

    actions = isAuth
      ? [
          { label: "Close", color: "secondary", onClick: onClose },
          { label: "Confirm Delete", color: "error", onClick: onDelete },
        ]
      : [{ label: "Close", color: "secondary", onClick: onClose }];
  }

  if (action === "update") {
    content = <ProductForm product={updatedProduct} onChange={onChange} setOpen={setOpen} setAction={setAction} mode = "update"/>;

    actions = isAuth
      ? [
          { label: "Close", color: "secondary", onClick: onClose },
        ]
      : [{ label: "Close", color: "secondary", onClick: onClose }];
  }

  return (
    <ConfirmDialog open={open} onClose={onClose} title={product.name} actions={<ActionButtons buttons={actions} />}>
      {content}
    </ConfirmDialog>
  );
}
