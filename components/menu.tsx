import styles from "../styles/Home.module.css";
import { Button, Menu as AntdMenu } from "antd";
import { CurrentUserBadge } from "../components/current-user-badge";
import { ConnectButton } from "../components/connect-button";
import { useState } from "react";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMenuState } from "../contexts/menu";

export function Menu() {
  const router = useRouter();
  const { connected, wallet, disconnect } = useWallet();

  const {selectedKeys, setSelectedKeys} = useMenuState();
  const setRoute = (route) => {
    router.push({ query: { mode: route } });
    setSelectedKeys([route]);
  };

  return (
    <AntdMenu
        mode="horizontal"
        selectedKeys={selectedKeys}
        className={styles.menu}
      >
        <AntdMenu.Item style={{ position: "unset" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-horizontal-gradient-dark.svg"
            alt="Solana Logo"
            className={styles["sol-logo"]}
          />
        </AntdMenu.Item>

        <AntdMenu.Item onClick={() => setRoute("mints")} key="mints">
          Gib Mints
        </AntdMenu.Item>
        <AntdMenu.Item onClick={() => setRoute("meta")} key="meta">
          Gib Meta
        </AntdMenu.Item>
        <AntdMenu.Item onClick={() => setRoute("holders")} key="holders">
          Gib Holders
        </AntdMenu.Item>
        <AntdMenu.Item onClick={() => setRoute("ar-links")} key="ar-links">
          Gib AR-Links (Beta)
        </AntdMenu.Item>
        <AntdMenu.Item
          onClick={() => setRoute("nft")}
          style={{ marginRight: "auto" }}
          key="nft"
        >
          Gib NFTs (Beta)
        </AntdMenu.Item>

        <AntdMenu.Item>
          {connected && (
            <Button onClick={() => disconnect().catch()}>
              Disconnect {wallet.name}
            </Button>
          )}
          {!connected && <ConnectButton />}
          {connected && <CurrentUserBadge />}
        </AntdMenu.Item>
      </AntdMenu>
  )
}