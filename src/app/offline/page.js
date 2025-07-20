"use client";

import { Button, Card, CardBody } from "@nextui-org/react";

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardBody className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v20M2 12h20" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            អ្នកកំពុងក្រៅបណ្តាញ
          </h1>
          
          <p className="text-gray-600 mb-6">
            បច្ចុប្បន្នអ្នកមិនមានការភ្ជាប់អ៊ីនធឺណេត។ សូមពិនិត្យការភ្ជាប់របស់អ្នក ហើយព្យាយាមម្តងទៀត។
          </p>
          
          <div className="space-y-4">
            <Button 
              color="primary" 
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
              onPress={handleRetry}
            >
              ព្យាយាមម្តងទៀត
            </Button>
            
            <div className="text-sm text-gray-500">
              <p className="mb-2">អ្នកនៅតែអាច:</p>
              <ul className="text-left space-y-1">
                <li>• មើលទិន្នន័យដែលបានទាញយកមុន</li>
                <li>• ធ្វើការជាមួយកម្មវិធីដែលបានកម្ចាត់</li>
                <li>• រង់ចាំការភ្ជាប់បណ្តាញមកវិញ</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 