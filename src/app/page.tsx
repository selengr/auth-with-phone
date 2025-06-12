import { Input, Button } from "@/components/ui";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
             <Input
              id="phone"
              type="tel"
              label="شماره تلفن"
              placeholder="912-345-6789"
              value={"091308"}
              // onChange={()=>console.log('================>',)}
              error={""}
              required
              className={""}
              maxLength={13}
            />


          <Button type="submit" loading={false} fullWidth className={""}>
            {false ? "در حال ورود..." : "ورود"}
          </Button>
    </div>
  );
}
