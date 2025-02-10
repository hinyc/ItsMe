'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormInputs {
  nickname: string;
  email: string;
  emailPublic: boolean;
  instagram?: string;
}

export default function EditPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  //!edit page를 새로 만들지 말고 edit 상태를 추가하고 화면 ui를 최대한 그대로사용하자
  return (
    <div className="h-full bg-slate-100 p-4">
      <h1 className="mb-6 text-3xl font-bold">프로필 수정</h1>
      <div className="mx-auto max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-lg bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="nickname" className="mb-1 block text-sm font-medium text-gray-700">
              닉네임 *
            </label>
            <input
              id="nickname"
              type="text"
              {...register('nickname', {
                required: '닉네임은 필수입니다',
                minLength: { value: 2, message: '닉네임은 2자 이상이어야 합니다' },
                maxLength: { value: 20, message: '닉네임은 20자 이하여야 합니다' }
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nickname && (
              <p className="mt-1 text-sm text-red-600">{errors.nickname.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              이메일 *
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: '이메일은 필수입니다',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '유효한 이메일 주소를 입력해주세요'
                }
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="checkbox"
                id="emailPublic"
                {...register('emailPublic')}
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="emailPublic" className="text-sm text-gray-600">
                이메일 공개
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="instagram" className="mb-1 block text-sm font-medium text-gray-700">
              인스타그램
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">@</span>
              <input
                id="instagram"
                type="text"
                {...register('instagram', {
                  pattern: {
                    value: /^[a-zA-Z0-9._]+$/,
                    message: '유효한 인스타그램 사용자명을 입력해주세요'
                  }
                })}
                className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="username"
              />
            </div>
            {errors.instagram && (
              <p className="mt-1 text-sm text-red-600">{errors.instagram.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
}
