import React from "react";
import styles from "./iaDropDown.module.css";
import { Tooltip } from "@mui/material";

const IaDropDown = () => {
  return (
    <div style={{ display: "inline" }}>
      <nav role="navigation" className={styles.primaryNavigation}>
        <ul className={styles.navUl}>
          <li>
            <a href="#" className={styles.aLink}><img src="/images/ai.png" style={{ width: "25px" }} /></a>
            <ul className="dropdown">
              <li>
                <Tooltip 
                    title="Verileriniz paylaşılmaz" 
                    placement="right"
                    disableInteractive
                    PopperProps={{
                        modifiers: [
                          {
                            name: "preventOverflow",
                            options: {
                              boundary: "window",
                            },
                          },
                        ],
                      }}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: "white !important",
                            color: "black !important",
                            border: "1px solid #ccc",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px",
                            fontWeight: "bold",
                          },
                        },
                      }}>
                    <a href="#" className={styles.aLink}>Deepseek sor </a>
                </Tooltip>
              </li>
              <li>
                <Tooltip 
                    title="Verileriniz uzak sunucuya gönderilecek" 
                    placement="right"
                    disableInteractive
                    PopperProps={{
                        modifiers: [
                            {
                            name: "preventOverflow",
                            options: {
                                boundary: "window",
                            },
                            },
                        ],
                        }}
                        componentsProps={{
                        tooltip: {
                            sx: {
                            backgroundColor: "white !important",
                            color: "black !important",
                            border: "1px solid #ccc",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px",
                            fontWeight: "bold",
                            },
                        },
                    }}
                >
                    <a href="#" className={styles.aLink}>Gemini sor</a>
                </Tooltip>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default IaDropDown;
