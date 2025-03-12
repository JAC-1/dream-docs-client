'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  FileImage,
  FileIcon as FilePdf,
  Smartphone,
  Server,
  Shield,
  Download,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const steps = [
  { title: 'はじめに', icon: Smartphone },
  { title: 'ファイルの準備', icon: FileText },
  { title: 'アップロード', icon: FileImage },
  { title: 'セキュリティ', icon: Shield },
  { title: '完了', icon: Server },
];

export default function Info() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen dark:from-slate-950 dark:to-slate-900 p-6 md:p-10">
      <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur my-8">
        <CardHeader className="text-center pb-6 pt-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <FileText className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dream Docs チュートリアル
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            安全なドキュメント管理システムの使い方
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-0">
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-2 text-center">{step.title}</span>
              </div>
            ))}
          </div>

          <Progress
            value={(currentStep / (steps.length - 1)) * 100}
            className="mb-8"
          />

          <motion.div
            key={currentStep}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dream Docsへようこそ</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  このシステムは、留学に関する書類を安全に送信・管理するために特別に開発されました。以下の手順に従って、書類をアップロードしてください。
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">準備するもの：</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-slate-600 dark:text-slate-400">
                    <li>パスポートのコピー</li>
                    <li>留学申請書</li>
                    <li>成績証明書</li>
                    <li>健康診断書</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ファイルの準備</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  アップロードする前に、すべてのファイルが正しい形式であることを確認してください。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm">
                      Word文書 (.docx) - 申請書、エッセイなど
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FilePdf className="h-5 w-5 text-red-500" />
                    <span className="text-sm">
                      PDF文書 (.pdf) - 成績証明書、推薦状など
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileImage className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">
                      画像ファイル (.jpg, .png) - パスポートコピー、写真など
                    </span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  ファイルのアップロード
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  準備したファイルをシステムにアップロードします。
                </p>
                <ol className="list-decimal list-inside text-sm space-y-2 text-slate-600 dark:text-slate-400">
                  <li>「ファイルを選択」ボタンをクリックします。</li>
                  <li>アップロードするファイルを選択します。</li>
                  <li>ファイルの種類を正しく選択してください。</li>
                  <li>
                    「アップロード」ボタンをクリックして、ファイルを送信します。
                  </li>
                </ol>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    注意
                  </h4>
                  <p className="text-sm">
                    ファイルサイズは1ファイルにつき10MB以下にしてください。大きなファイルは圧縮するか、複数に分割してアップロードしてください。
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">セキュリティ対策</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Dream
                  Docsは、あなたの個人情報を保護するために複数のセキュリティ対策を実施しています。
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium">暗号化</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        すべてのファイルは、アップロード時に暗号化されます。
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Server className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium">安全なストレージ</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        ファイルは安全なサーバーに保存され、許可された人物のみがアクセスできます。
                      </p>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                >
                  カナダ政府認定のセキュリティ基準に準拠
                </Badge>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">完了</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  おめでとうございます！すべての手順が完了しました。
                </p>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">次のステップ：</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-slate-600 dark:text-slate-400">
                    <li>アップロードしたファイルの確認メールが届きます。</li>
                    <li>
                      必要に応じて、追加の情報の提供を求められる場合があります。
                    </li>
                    <li>
                      申請の進捗状況は、Dream Docsダッシュボードで確認できます。
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  ご不明な点がある場合は、サポートチームにお問い合わせください。
                </p>
              </div>
            )}
          </motion.div>
        </CardContent>

        <CardFooter className="flex justify-between pt-0 px-6 pb-8">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            前へ
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-xs"
              onClick={nextStep}
            >
              次へ
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              size="sm"
              className="bg-gradient-to-r from-green-600 to-teal-600 text-xs"
              onClick={() => (window.location.href = '/')}
            >
              完了
              {/* <Download className="h-4 w-4 ml-1" /> */}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
