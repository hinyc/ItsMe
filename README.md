프리지마 스키마 초기화
npx prisma migrate dev --name init
prisma/migrations 폴더에 있는 기존 마이그레이션 파일들을 삭제하고
npx prisma migrate reset --force를 실행한 다음
npx prisma migrate dev로 새로운 마이그레이션을 생성해야 합니다