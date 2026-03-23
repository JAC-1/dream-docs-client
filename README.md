# Dream Docs — Client

The student-facing web application for a secure, end-to-end encrypted document submission system built for Japanese study abroad applicants.

---

## Overview

Dream Docs is the first generation of the document delivery platform. This repository is the **student-facing client** — a Next.js web app where students authenticate, track their required submissions, and securely upload documents. The companion admin application was a separate native desktop program written in Rust using the [Iced](https://github.com/iced-rs/iced) GUI crate, used by administrators to review and manage submissions.

The application is entirely Japanese-language facing, designed for Japanese high school students submitting personal documents (passports, photos, waivers, essays) as part of a Canadian study abroad program application process. All user-facing copy, error messages, and onboarding guides are written in Japanese.

The primary design constraint was security: files are encrypted **client-side** before they ever leave the browser, ensuring the server never handles plaintext document data.

---

## Features

- **Client-side E2E encryption** — files are encrypted with AES-256-GCM in the browser using the Web Crypto API before upload
- **RSA-OAEP key wrapping** — symmetric encryption keys are wrapped with a server RSA public key so only the server can decrypt them
- **Task dashboard** — students see all required document submissions with live status indicators (new / pending / approved / declined)
- **9 document task types** — study abroad waiver, personal info waiver, Why Study in Canada essay, host family letter, passport copy, headshot, immunization record, family photos, course request form
- **Interactive onboarding tutorial** — 5-step guided walkthrough explaining the submission and security process
- **Clerk authentication** — secure user sessions with Japanese-localised error handling
- **Downloadable templates** — students can download template documents directly from each task page
- **Animated UI** — Framer Motion and GSAP animations throughout
- **E2E and unit tests** — Cypress for integration flows, Jest + Testing Library for component tests

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Authentication | Clerk |
| Encryption | Web Crypto API (AES-256-GCM + RSA-OAEP) |
| File Storage | Turso (LibSQL) — encrypted blobs |
| Metadata & Keys | Supabase (PostgreSQL) |
| UI | Tailwind CSS, shadcn/ui, Radix UI |
| Animation | Framer Motion, GSAP |
| Testing | Cypress, Jest, Testing Library |
| Font | Kosugi Maru (Japanese) |

---

## Encryption Model

1. A random AES-256-GCM symmetric key is generated in the browser
2. The file is encrypted locally with that key — the plaintext never leaves the device
3. The server RSA public key is fetched, then used to wrap the symmetric key with RSA-OAEP
4. The encrypted file and the wrapped key are sent to the server separately
5. The encrypted file is stored in Turso; the wrapped key and document metadata are stored in Supabase
6. Decryption requires the server's RSA private key — held only by the admin application

---

## Getting Started

1. **Clone and install**

```bash
git clone <repo-url>
cd dream-docs-client
npm install
```

2. **Configure environment variables** — create `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
CLERK_SECRET_KEY=<clerk-secret-key>
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>
TURSO_DATABASE_URL=<turso-db-url>
TURSO_AUTH_TOKEN=<turso-auth-token>
PUBLIC_ENCRYPTION_KEY=<rsa-public-key-pem>
```

3. **Start the dev server**

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  components/
    header/           # App header with auth controls
    hompage/          # Welcome screen and task list dashboard
    submissionPage/   # File upload and encryption UI
    footer/           # App footer
  api/
    encrypt/          # POST — receives and stores encrypted file + wrapped key
    public-key/       # GET — serves RSA public key to client
  tasks/              # Individual task pages (one per document type)
  sign-in/            # Clerk sign-in flow
  info/               # Interactive onboarding tutorial

components/ui/        # shadcn/ui primitives
constants/            # Task type definitions
interfaces/           # TypeScript interfaces
lib/
  supabase/           # Supabase admin client and operations
  turso/              # Turso connection and encrypted file storage
utils/
  crypto/             # Web Crypto API wrappers (encryption, key management, helpers)
cypress/              # E2E test specs
```

---

## Screenshots

> Screenshots coming soon.

---

## Context

This client was built as part of the v1 Dream Docs system. The admin-side counterpart — a native desktop app built in Rust with the Iced GUI framework — handled document review and decryption. The split architecture (web client + native admin) later motivated a full rewrite into [dd-mk2](../dd-mk2/), which consolidates everything into a single Next.js application.

---
---

# 日本語 / Japanese

## Dream Docs — クライアント

カナダ留学申請者向けの、安全なエンドツーエンド暗号化ドキュメント提出システムの学生向け Web アプリケーションです。

---

## 概要

Dream Docs はドキュメント配信プラットフォームの第1世代です。このリポジトリは**学生向けクライアント**であり、学生が認証・提出物の確認・安全なドキュメントアップロードを行う Next.js Web アプリです。管理者側のアプリケーションは、[Iced](https://github.com/iced-rs/iced) GUI クレートを使用した Rust 製のネイティブデスクトップアプリとして別途開発されており、管理者が提出物のレビューと管理を行います。

アプリケーションは完全に日本語対応で設計されており、カナダ留学プログラムへの申請書類（パスポート、写真、同意書、志願理由書など）を提出する日本人高校生を対象としています。すべてのユーザー向けテキスト、エラーメッセージ、オンボーディングガイドは日本語で記述されています。

主要な設計要件はセキュリティであり、ファイルはブラウザを離れる前に**クライアント側で暗号化**されるため、サーバーが平文のドキュメントデータを扱うことはありません。

---

## 主な機能

- **クライアントサイド E2E 暗号化** — Web Crypto API を使用して AES-256-GCM でブラウザ内でファイルを暗号化してからアップロード
- **RSA-OAEP キーラッピング** — 対称暗号化キーはサーバーの RSA 公開鍵でラッピングされ、サーバーのみが復号可能
- **タスクダッシュボード** — 提出が必要なドキュメント一覧とリアルタイムのステータス表示（新規 / 審査中 / 承認済 / 却下）
- **9種類のドキュメントタスク** — 留学免責同意書、個人情報同意書、志願理由書、ホストファミリーへの手紙、パスポートのカラーコピー、証明写真、予防接種記録、家族写真、志望コース申込書
- **インタラクティブなチュートリアル** — 提出フローとセキュリティプロセスを説明する5ステップのガイド
- **Clerk 認証** — 日本語エラーメッセージ対応のセキュアなユーザーセッション管理
- **テンプレートダウンロード** — 各タスクページから書類テンプレートを直接ダウンロード可能
- **アニメーション UI** — Framer Motion と GSAP を使用したアニメーション
- **E2E・ユニットテスト** — Cypress（統合テスト）、Jest + Testing Library（コンポーネントテスト）

---

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 14（App Router） |
| 言語 | TypeScript |
| 認証 | Clerk |
| 暗号化 | Web Crypto API（AES-256-GCM + RSA-OAEP） |
| ファイルストレージ | Turso（LibSQL）— 暗号化ファイル保存 |
| メタデータ・キー | Supabase（PostgreSQL） |
| UI | Tailwind CSS、shadcn/ui、Radix UI |
| アニメーション | Framer Motion、GSAP |
| テスト | Cypress、Jest、Testing Library |
| フォント | 小杉丸（日本語） |

---

## 暗号化モデル

1. ブラウザ内でランダムな AES-256-GCM 対称鍵を生成
2. その鍵を使ってファイルをローカルで暗号化 — 平文はデバイスを離れない
3. サーバーから RSA 公開鍵を取得し、対称鍵を RSA-OAEP でラッピング
4. 暗号化ファイルとラッピングされた鍵を別々にサーバーへ送信
5. 暗号化ファイルは Turso に、ラッピングされた鍵とドキュメントメタデータは Supabase に保存
6. 復号にはサーバーの RSA 秘密鍵が必要 — 管理者アプリのみが保持

---

## セットアップ

1. **クローンとインストール**

```bash
git clone <repo-url>
cd dream-docs-client
npm install
```

2. **環境変数の設定** — `.env.local` を作成：

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Clerk 公開鍵>
CLERK_SECRET_KEY=<Clerk シークレットキー>
NEXT_PUBLIC_SUPABASE_URL=<Supabase URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase 匿名キー>
SUPABASE_SERVICE_ROLE_KEY=<Supabase サービスロールキー>
TURSO_DATABASE_URL=<Turso DB URL>
TURSO_AUTH_TOKEN=<Turso 認証トークン>
PUBLIC_ENCRYPTION_KEY=<RSA 公開鍵 PEM>
```

3. **開発サーバーの起動**

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) にアクセスしてください。

---

## プロジェクト構成

```
app/
  components/
    header/           # 認証コントロール付きヘッダー
    hompage/          # ウェルカム画面、タスク一覧ダッシュボード
    submissionPage/   # ファイルアップロード・暗号化 UI
    footer/           # フッター
  api/
    encrypt/          # POST — 暗号化ファイルとラッピング鍵を受信・保存
    public-key/       # GET — クライアントへ RSA 公開鍵を提供
  tasks/              # 各タスクページ（ドキュメントタイプごと）
  sign-in/            # Clerk サインインフロー
  info/               # インタラクティブなチュートリアル

components/ui/        # shadcn/ui プリミティブ
constants/            # タスクタイプ定義
interfaces/           # TypeScript インターフェース
lib/
  supabase/           # Supabase 管理クライアントと操作
  turso/              # Turso 接続とファイル保存操作
utils/
  crypto/             # Web Crypto API ラッパー（暗号化、鍵管理、ヘルパー）
cypress/              # E2E テストスペック
```

---

## スクリーンショット

> スクリーンショットは近日公開予定です。

---

## 背景

このクライアントは Dream Docs v1 システムの一部として開発されました。管理者側のアプリケーションは、Rust と Iced GUI フレームワークで構築されたネイティブデスクトップアプリで、ドキュメントのレビューと復号を担当しています。この分割アーキテクチャ（Web クライアント + ネイティブ管理アプリ）が、後に [dd-mk2](../dd-mk2/) への完全リライトのきっかけとなりました。dd-mk2 ではすべてを単一の Next.js アプリケーションに統合しています。
