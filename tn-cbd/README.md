# SBT selective disclosure with Threshold Network

## 何

* SBTにメッセージの解錠キーを紐付けて、VCとして発行する
* SBT(VC) holderは有効期限付きで特定のwalletにデータが見えるような権限を付与できる

![Untitled (4)](https://user-images.githubusercontent.com/5776910/223904587-2b907d06-346f-41b1-880a-0ff690540c89.jpg)

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

* Threshold NetworkがまだPoC段階
  * 仕様もセキュリティ周りもまだ荒い