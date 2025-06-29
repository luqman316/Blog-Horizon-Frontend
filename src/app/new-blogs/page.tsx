import BlogForm from "@/components/BlogForm";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

async function NewBlogs() {
  const workos = new WorkOS(process.env.WORKOS_API_KEY || "");
  //   async function createCompany(data: FormData) {
  //     "use server";
  //     await workos.organizations.createOrganization({
  //       name: data.get("newCompanyName") as string,
  //     });
  //   }

  const { user } = await withAuth();

  if (!user) {
    //   alert("You need to be logged in to create a new listing")
    return (
      <div className="container mx-auto my-4">
        <div className=" font-bold text-xl font-sans">
          You need to logged in to post a blog.
        </div>
      </div>
    );
  }

  //   let organizationMemberships: AutoPaginatable<OrganizationMembership> | null =
  // null;

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === "active"
  );
  const organizationNames: { [key: string]: string } = {};

  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationNames[activeMembership.organizationId] = organization.name;
  }
  return (
    <div className="container mx-auto my-4">
      <BlogForm />
    </div>
  );
}

export default NewBlogs;
