"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import {
  bookLibraryBorrowSchema,
  BORROW_OPTIONS,
  type TBookLibraryBorrowSchema,
} from "@/lib/validations/book/book-borrow"
import BookPreview from "@/components/ui/book-preview"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { BookQrDialog } from "./book-qr-dialog"

const BookLibraryBorrow = () => {
  const t = useTranslations("BookPage")
  const tGeneralManagement = useTranslations("GeneralManagement")
  const [bookFile, setBookFile] = useState<File | null>(null)
  const [openBookQr, setOpenBookQr] = useState(false)
  const form = useForm<TBookLibraryBorrowSchema>({
    resolver: zodResolver(bookLibraryBorrowSchema),
    defaultValues: {
      borrowOption: BORROW_OPTIONS.LIBRARY,
      returnDate: "",
      bookSerialNo: "",
      description: "",
    },
  })

  const handleFileSelection = (file: File | null) => {
    setBookFile(file)

    if (file) {
      const randomSerial = Math.floor(
        100000 + Math.random() * 900000
      ).toString()
      form.setValue("bookSerialNo", randomSerial)
      form.clearErrors("bookSerialNo")
    }
  }

  const onSubmit = async (values: TBookLibraryBorrowSchema) => {
    console.log("Form submitted with values:", values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <FormField
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.return date")}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value
                        ? format(new Date(field.value), "dd-MM-yyyy")
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bookSerialNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.book serial no")}</FormLabel>
                <FormControl>
                  <div className="relative h-10 w-full">
                    <BookQrDialog
                      open={openBookQr}
                      setOpen={setOpenBookQr}
                      onFileSelect={handleFileSelection}
                    />
                    <Input
                      {...field}
                      type="text"
                      className="pl-10"
                      placeholder={tGeneralManagement(
                        "placeholder.book serial no"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {bookFile && <BookPreview objectUrl={bookFile} />}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.description")}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={tGeneralManagement("placeholder.description")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-x-4">
            <Button type="submit">{t("borrow")}</Button>
            <DialogClose asChild>
              <Button variant="secondary">{t("cancel")}</Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default BookLibraryBorrow
