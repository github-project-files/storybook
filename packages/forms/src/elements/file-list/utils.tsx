/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
export enum FileType {
  pdf = 'pdf',
  zip = 'zip',
  image = 'image',
  document = 'document',
  spreadsheet = 'spreadsheet',
  presentation = 'presentation',
  generic = 'generic'
}

export enum ValidationType {
  success = 'success',
  error = 'error'
}

export type FILE_TYPE = keyof typeof FileType;

export type VALIDATION_TYPE = keyof typeof ValidationType;

export const ARRAY_FILE_TYPE: FILE_TYPE[] = [...Object.values(FileType)];

export const fileIconsDefault: Record<FILE_TYPE | VALIDATION_TYPE, React.ReactNode> = {
  pdf: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M14.5 4.2V15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h8.85a.5.5 0 01.36.15l3.15 3.2a.5.5 0 01.14.35zm-10 8.3h7m-7-2h7m-1-10V4a.5.5 0 00.5.5h3.5"/>
  <rect width="8" height="2" x="4" y="7" fill="currentColor" rx=".5" ry=".5"/>
</svg>,
  zip: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M6.5.5v11M5 2.5h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m8-6.3V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"/>
</svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5m-11 9l2.65-2.65c.2-.2.51-.2.71 0l1.79 1.79c.2.2.51.2.71 0l.79-.79c.2-.2.51-.2.71 0l1.65 1.65"/>
  <circle cx="10.5" cy="8.5" r="1.5" fill="currentColor"/>
</svg>,
  document: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M4.5 7.5h7m-7 1.97h7m-7 2h7m3-7.27V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"/>
</svg>,
  spreadsheet: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M4.5 7.5h2m-2 2h2m-2 2h2m2-4h3m-3 2h3m-3 2h3m3-7.3V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"/>
</svg>,
  presentation: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" d="M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5M7 9.5h4c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5H7c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5zm-.5 2H5c-.28 0-.5-.22-.5-.5V8c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5v1.5"/>
</svg>,
  generic: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" d="M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"/>
</svg>,
  success: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <g fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9l2.5 2.5 5-5"/>
    <circle cx="7.5" cy="8.5" r="7"/>
  </g>
</svg>,
  error: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M14.5 4.205V15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h8.853a.5.5 0 01.356.15l3.148 3.204a.5.5 0 01.143.35zM10.5.5V4a.5.5 0 00.5.5h3.5m-9 8l5-5m0 5l-5-5"/>
</svg>
};

export const fileIconsCompact: Record<FILE_TYPE | VALIDATION_TYPE, React.ReactNode> = {
  pdf: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M14.5 4.2V15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h8.85a.5.5 0 01.36.15l3.15 3.2a.5.5 0 01.14.35zm-10 8.3h7m-7-2h7m-1-10V4a.5.5 0 00.5.5h3.5"/>
  <rect width="8" height="2" x="4" y="7" fill="currentColor" rx=".5" ry=".5"/>
</svg>,
  zip: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M6.5.5v11M5 2.5h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m0 1H8m-3 1h1.5m8-6.3V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"/>
</svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5m-11 9l2.65-2.65c.2-.2.51-.2.71 0l1.79 1.79c.2.2.51.2.71 0l.79-.79c.2-.2.51-.2.71 0l1.65 1.65"/>
  <circle cx="10.5" cy="8.5" r="1.5" fill="currentColor"/>
</svg>,
  document: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M4.5 7.5h7m-7 1.97h7m-7 2h7m3-7.27V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"/>
</svg>,
  spreadsheet: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M4.5 7.5h2m-2 2h2m-2 2h2m2-4h3m-3 2h3m-3 2h3m3-7.3V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"/>
</svg>,
  presentation: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" d="M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5M7 9.5h4c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5H7c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5zm-.5 2H5c-.28 0-.5-.22-.5-.5V8c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5v1.5"/>
</svg>,
  generic: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" d="M14.5 4.2V15c0 .28-.22.5-.5.5H2c-.28 0-.5-.22-.5-.5V1c0-.28.22-.5.5-.5h8.85c.13 0 .26.05.36.15l3.15 3.2c.09.1.14.22.14.35zm-4-3.7V4c0 .28.22.5.5.5h3.5"/>
</svg>,
  success: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <g fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9l2.5 2.5 5-5"/>
    <circle cx="7.5" cy="8.5" r="7"/>
  </g>
</svg>,
  error: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinecap="round" d="M14.5 4.205V15a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V1A.5.5 0 012 .5h8.853a.5.5 0 01.356.15l3.148 3.204a.5.5 0 01.143.35zM10.5.5V4a.5.5 0 00.5.5h3.5m-9 8l5-5m0 5l-5-5"/>
</svg>
};
