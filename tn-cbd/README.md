# SBT selective disclosure with Threshold Network

## 何

* SBTにメッセージの解錠キーを紐付けて、VCとして発行する
* SBT(VC) holderは有効期限付きで特定のwalletにデータが見えるような権限を付与できる

![構成図](https://user-images.githubusercontent.com/5776910/230219606-b82d8334-9f3a-4f9a-8287-7242a0598859.jpg)

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