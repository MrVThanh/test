"use client"

import { useEffect, useState } from "react"
import { BookUp, CheckCircle, Printer, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { borrowedListDummy } from "../../_components/borrowedListDummy"
import MachineHomeBtn from "../../_components/machine-home-btn"

const MachineBorrowPreview = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 8000)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-2 rounded-lg bg-background p-6">
        <MachineHomeBtn />
        <div className="flex flex-1 items-start justify-center gap-8">
          <div className="h-full w-1/5 space-y-4">
            <div className="flex h-2/3 w-full items-center justify-center rounded-lg border bg-accent shadow-lg">
              <BookUp size={200} strokeWidth={1} />
              {/* <motion.div
              initial={{ x: -200, opacity: 1 }} 
              animate={{
                x: isAnimating ? [0, 0, 200] : -200, 
                opacity: isAnimating ? [1, 1, 0] : 1, 
              }}
              transition={{
                duration: 2, 
                ease: "easeInOut", 
                times: [0, 0.5, 1], 
                delay: 2, 
              }}
            >
              <BookUp size={200} strokeWidth={1} />
            </motion.div> */}
            </div>
            <p className="text-center font-semibold">
              Đặt tài liệu vào khu vực đầu đọc
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <h1 className="text-xl font-semibold">
              Danh sách tài liệu được mượn
            </h1>
            <Table className="overflow-hidden rounded-lg border p-4 shadow-lg">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Số lượng</TableHead>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead className="w-[150px]">Hạn trả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowedListDummy.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-end">
        {/* <MachineLogoutBtn /> */}
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <CheckCircle size={28} /> Hoàn thành
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn muốn in biên lai không?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-4">
            <Button
              variant={"outline"}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <XCircle size={28} /> Không
            </Button>
            <Button className="flex items-center gap-2">
              <Printer size={28} /> In biên lai
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MachineBorrowPreview
