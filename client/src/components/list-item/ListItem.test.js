import CustomListItem from ".";

describe("Custom List Item Component", () => {
  test("Show resource", () => {
    const resource = "Exam";

    render(<CustomListItem resource={resource} />);

    expect(screen.queryByText(title)).toBeInTheDocument();
  });

  test("Show header", () => {
    const headher = "Tester";

    render(<CustomListItem header={header} />);

    expect(screen.queryByText(header)).toBeInTheDocument();
  });

  test("Content header nad text", () => {
    const contentHeader = "Lecturer";
    const contentText = "Test Tester";

    render(
      <CustomListItem contentHeader={contentHeader} contentText={contentText} />
    );

    expect(screen.queryByText(contentHeader)).toBeInTheDocument();
    expect(screen.queryByText(contentText)).toBeInTheDocument();
  });
});
