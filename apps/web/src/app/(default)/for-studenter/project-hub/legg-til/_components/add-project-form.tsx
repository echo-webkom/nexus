"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addProjectSchema } from "@/lib/schemas/project";
import { addProject } from "../_actions/add-project";

export const AddProjectForm = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (data) => {
      const { success, message } = await addProject(data);

      toast({
        title: message,
        variant: success ? "success" : "destructive",
      });

      if (success) {
        form.reset();
      }
    },
    (error) => {
      console.error(error);
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Tittel</FormLabel>
              <FormControl>
                <Input id="title" placeholder="Project X" {...field} />
              </FormControl>
              <FormDescription>Tittel på prosjektet ditt</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Beskrivelse</FormLabel>
              <FormControl>
                <Textarea id="description" placeholder="Dette er et prosjekt..." {...field} />
              </FormControl>
              <FormDescription>Beskrivelse av prosjektet ditt</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="url">URL</FormLabel>
              <FormControl>
                <Input id="url" placeholder="https://verv.echo-webkom.no" {...field} />
              </FormControl>
              <FormDescription>Lenke til prosjektet ditt</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Legg til prosjekt</Button>
      </form>
    </Form>
  );
};
