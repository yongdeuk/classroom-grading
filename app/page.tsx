import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
        클래스룸 수행평가 채점
      </h1>

      {session?.user ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-zinc-700 dark:text-zinc-300">
            {session.user.name} ({session.user.email})로 로그인됨
          </p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="rounded-full border px-5 py-2 text-sm font-medium">
              로그아웃
            </button>
          </form>
        </div>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">
            Google로 로그인
          </button>
        </form>
      )}
    </div>
  );
}
