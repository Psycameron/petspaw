// export const metadata = {
//   title: "PestPaw app",
//   description: "Generated by create next app",
// };
"use client";

import { usePathname } from "next/navigation";
import { useSearch } from "@/contexts/searchContext";
import { useEffect } from "react";
import { getCatsByBreed } from "@/utils/api";

import AdditionalNav from "@/components/AdditionalNav/AdditionalNav";
import BackBtn from "@/components/BackBtn/BackBtn";
import SearchForm from "@/components/SearchForm/SearchForm";
import Paper from "@/components/Paper/Paper";
import styles from "./layout.module.css";

const LIMIT = 10;

export default function PagesLayout({ children }) {
  const pathname = usePathname();

  const { query, breeds, breedIds, setQuery, setCats } = useSearch();

  useEffect(() => {
    if (pathname !== "/search") {
      setQuery("");
      setCats(null);
    }
  }, [pathname, setCats, setQuery]);

  function handleChange(e) {
    setQuery(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (query.trim() === "") {
      return;
    }

    if (breedIds) {
      async function fetchData() {
        const data = await getCatsByBreed(breedIds, LIMIT);
        setCats(data);
      }
      fetchData();
    } else {
      setCats([]);
    }
  }

  if (!breeds) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.navWrapper}>
        <SearchForm handleSubmit={handleSubmit} handleChange={handleChange} />
        <AdditionalNav />
      </div>
      <Paper>
        <div className={styles.innerWrapper}>
          <BackBtn />
          {pathname.startsWith("/breeds/") ? (
            <>
              <h2 className={`${styles.title} ${styles.titleNotActive}`}>
                {pathname.slice(1, 7).toUpperCase()}
              </h2>
              <h2 className={styles.title}>
                {pathname.replace("/breeds/", "").toUpperCase()}
              </h2>
            </>
          ) : (
            <h2 className={styles.title}>
              {pathname.replace("/", "").toUpperCase()}
            </h2>
          )}
        </div>
        {children}
      </Paper>
    </section>
  );
}
