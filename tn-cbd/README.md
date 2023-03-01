# SBT selective disclosure with Threshold Network

![Untitled (3)](https://user-images.githubusercontent.com/5776910/222158420-84c18e3f-47f7-43ca-8cae-820e8be4e9de.jpg)

## デモ

```
yarn
yarn build
yarn start
```

各々の専用ページから操作する
* `http://localhost:8080/issuer`
* `http://localhost:8080/holder`
* `http://localhost:8080/verifier`

## 課題

* VCの公開がThreshold Networkのセキュリティに強く依存する
* Issuer -> HolderにSBTを発行した事実が公開される
  * 解決策
    * SBTコントラクトを共通にする
    * stealth-addressを使う
    * L2を使う(Threshold Networkも不要)