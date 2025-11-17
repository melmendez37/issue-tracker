'use client';

import { Button, Callout, Spinner, Text, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { set, z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const router = useRouter();
   const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
   });

   const [error, setError] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className='max-w-xl space-y-8'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form  
        onSubmit={handleSubmit(async(data) => {
          try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
          setIsSubmitting(false);
            setError('An unexpected error occurred. Please try again.');
          }
           
          })}>
          <TextField.Root className='mb-5' placeholder='Title' {...register('title')}/>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller 
              name='description'
              control={control}
              render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}>
          </Controller>
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
    
  )
}

export default NewIssuePage