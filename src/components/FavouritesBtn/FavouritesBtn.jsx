import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Fav from "public/images/svg/fav.svg";
import Unfav from "public/images/svg/unfav.svg";
import styles from "./FavouritesBtn.module.css";

export default function FavouritesBtn({
  catId,
  favouritesCats,
  addToFavourites,
  deleteFromFavourites,
  addLog,
}) {
  const pathname = usePathname();
  const reuse = pathname === "/gallery" || pathname === "/favourites";
  const [isFavourites, setIsFavourites] = useState(false);
  const [catForDelete, setCatForDelete] = useState(null);

  useEffect(() => {
    if (pathname === "/favourites") {
      setIsFavourites(favouritesCats?.map((el) => el.id).includes(catId));
      setCatForDelete(favouritesCats?.filter((el) => el.id === catId));
    } else {
      setIsFavourites(favouritesCats?.map((el) => el.image_id).includes(catId));
      setCatForDelete(favouritesCats?.filter((el) => el.image_id === catId));
    }
  }, [catId, favouritesCats, pathname]);

  return (
    <button
      className={`${styles.button} ${isFavourites ? styles.active : ""} ${
        reuse ? styles.reuse : ""
      }`}
      type="button"
      name="Favourites"
      onClick={
        isFavourites
          ? (e) => {
              deleteFromFavourites(catForDelete[0].id);
              addLog(catId, `was removed from ${e.currentTarget.name}`);
            }
          : (e) => {
              addToFavourites(catId);
              addLog(catId, `was added to ${e.currentTarget.name}`);
            }
      }
    >
      {!isFavourites ? (
        <Fav
          className={`${styles.icon} ${styles.fav} ${
            reuse ? styles.reuse : ""
          } `}
        />
      ) : (
        <Unfav
          className={`${styles.icon} ${styles.unfav} ${
            reuse ? styles.reuse : ""
          } `}
        />
      )}
    </button>
  );
}
