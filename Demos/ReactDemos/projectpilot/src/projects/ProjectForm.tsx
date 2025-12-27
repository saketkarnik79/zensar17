function ProjectForm() {
    return (
        <>
            <form className="input-group vertical">
                <label htmlFor="name">Project Name</label>
                <input type="text" name="name" id="name" placeholder="Enter Project Name" />

                <label htmlFor="description">Project Description</label>
                <textarea name="description" id="description" placeholder="Enter Project Description" />

                <label htmlFor="budget">Project Budget</label>
                <input type="number" name="budget" id="budget" placeholder="Enter Project Budget" />

                <label htmlFor="isActive">Project Active?</label>
                <input type="checkbox" name="isActive" id="isActive" placeholder="Is Project Active?" />

                <div className="input-group">
                    <button type="submit" className="button primary bordered medium">Save</button>
                    <span/>
                    <button type="button" className="button bordered medium">Cancel</button>
                </div>
            </form>
        </>
    );
};

export { ProjectForm };