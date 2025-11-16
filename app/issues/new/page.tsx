'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const router = useRouter();
   const { register, control, handleSubmit } = useForm<IssueForm>();

   const [error, setError] = useState('');

  return (
    <div className='max-w-xl space-y-3'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form  
        onSubmit={handleSubmit(async(data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occurred. Please try again.');
          }
           
          })}>
          <TextField.Root placeholder='Title' {...register('title')}/>
          <Controller 
              name='description'
              control={control}
              render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}>
              
          </Controller>
          <Button>Submit New Issue</Button>
      </form>
    </div>
    
  )
}

export default NewIssuePage